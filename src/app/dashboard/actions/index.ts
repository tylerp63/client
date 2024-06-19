"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
const puppeteer = require("puppeteer");

export async function createProduct(
  productName: string,
  price: string,
  boughtPastMonth: string,
  imageSrc: string
) {
  const supabase = await createSupabaseServerClient();

  const result = await supabase
    .from("products")
    .insert({ productName, price, boughtPastMonth, imageSrc })
    .single();
  revalidatePath("/dashboard");
  return JSON.stringify(result);
}

export async function readProduct() {
  noStore();
  const supabase = await createSupabaseServerClient();
  return await supabase.from("products").select("*");
}

export async function readProductById(id: string) {
  const supabase = await createSupabaseServerClient();
  return await supabase.from("products").select("*").eq("id", id);
}

async function handleCookiesPopup(page: { $: (arg0: string) => any }) {
  const cookiesButton = await page.$("#sp-cc-accept");
  if (cookiesButton) {
    await cookiesButton.click();
  }
}

function getRandomInt(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

const randomInt: number = getRandomInt(0, 8);

export async function runScraper() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // Open a new page
  const page = await browser.newPage();

  const searchPhrase = "mate cup"; // Set your search phrase here
  const scrapeToPage = 1; // Set the desired page to scrape to

  console.log("Search phrase:", searchPhrase); // Log searchPhrase
  console.log("Scrape to page:", scrapeToPage); // Log scrapeToPage
  // Navigate to Amazon's cart page
  const homeUrl = "https://www.amazon.com/gp/cart/view.html";
  await page.goto(homeUrl, { waitUntil: "domcontentloaded" });

  await handleCookiesPopup(page); // Call the function to handle cookies window
  await page.waitForSelector("#twotabsearchtextbox");
  // Type the search phrase and click the search button
  await page.type("#twotabsearchtextbox", searchPhrase);
  await page.click("#nav-search-submit-button");

  // Wait for the search results page to load
  await page.waitForSelector(".s-widget-container");

  const url = page.url(); // Get the current URL after the search

  const cardData: any[] = [];

  async function scrapePage(url: string, currentPage = 1, scrapeToPage = null) {
    console.log("Scraping page " + currentPage + "...");
    if (scrapeToPage !== null && currentPage > scrapeToPage) {
      return; // Stop scraping if the current page exceeds the target page
    }
    //  Navigate to the URL
    await page.goto(url);

    await handleCookiesPopup(page); // Call the function to handle cookies window

    //  Wait for selector
    await page.waitForSelector(".s-widget-container");

    const pageCardData = await page.evaluate(() => {
      const cards = Array.from(
        document.querySelectorAll(".s-widget-container")
      );

      const cardInfo = cards
        .map((card) => {
          // Product name
          const productNameElement = card.querySelector("h2");
          const productName = productNameElement
            ? productNameElement.textContent?.trim()
            : null;

          // Sponsored tag
          // const sponsoredTag = card.querySelector(".puis-sponsored-label-text");
          // const sponsored = sponsoredTag ? "yes" : "no";

          // Badge
          // const badgeElement = card.querySelector("span.a-badge-label-inner");
          // const badge = badgeElement ? badgeElement.textContent : "N/A";

          // Image
          const imageElement = card
            .querySelector(".s-image")
            ?.getAttribute("src");
          const imageSrc = imageElement ? imageElement : "N/A";
          // Price
          const priceElement = card.querySelector(".a-price .a-offscreen");
          const price = priceElement ? priceElement.textContent : "N/A";

          // Base price (without discount)
          // const basePriceElement = card.querySelector(
          //   "span.a-price.a-text-price > span.a-offscreen"
          // );
          // const basePrice = basePriceElement
          //   ? basePriceElement.textContent
          //   : "N/A";

          // Rating
          // const ratingElement = card.querySelector(
          //   ".a-row > span:nth-child(1)[aria-label]"
          // );
          // const decimalRegex = /^\d+([,.]\d+)?$/;
          // const ariaLabel = ratingElement
          //   ? ratingElement.getAttribute("aria-label")
          //   : "N/A";
          // const firstThreeCharacters = ariaLabel.substring(0, 3);
          // const rating = decimalRegex.test(firstThreeCharacters)
          //   ? firstThreeCharacters.replace(",", ".")
          //   : "N/A";

          // Ratings number
          // const ratingsNumberElement = card.querySelector(
          //   ".a-row > span:nth-child(2)[aria-label]"
          // );
          // const numberRegex = /^-?\d+(\.\d+)?$/;
          // const numberFormated = ratingsNumberElement
          //   ? ratingsNumberElement
          //       .getAttribute("aria-label")
          //       .replace(/[\s.,]+/g, "")
          //   : "N/A";
          // const ratingsNumber = numberRegex.test(numberFormated)
          //   ? numberFormated
          //   : "N/A";

          // Quantity sold last month
          const boughtPastMonthElement = card.querySelector(
            ".a-row.a-size-base > .a-size-base.a-color-secondary"
          );
          const textContent = boughtPastMonthElement
            ? boughtPastMonthElement.textContent
            : "N/A";
          const plusSignRegex = /\+/;
          const plusSignText = textContent
            ? textContent.match(plusSignRegex)
            : null;
          const boughtPastMonth =
            plusSignText && plusSignText.length > 0 ? plusSignText[0] : "N/A";

          if (productName) {
            return {
              productName,
              price,
              boughtPastMonth,

              imageSrc,
            };
          } else {
            return null; // Return null for empty items
          }
        })
        .filter((card) => card !== null);

      return cardInfo;
    });

    cardData.push(...pageCardData);

    if (scrapeToPage === null || currentPage < scrapeToPage) {
      const nextPageButton = await page.$(".s-pagination-next");
      if (nextPageButton) {
        const isDisabled = await page.evaluate(
          (btn: HTMLElement) => btn.hasAttribute("aria-disabled"),
          nextPageButton
        );
        if (!isDisabled) {
          const nextPageUrl = encodeURI(
            await page.evaluate(
              (nextBtn: HTMLAnchorElement) => nextBtn.href,
              nextPageButton
            )
          );
          await scrapePage(nextPageUrl, currentPage + 1, scrapeToPage);
        } else {
          console.log("All available pages scraped:", currentPage);
        }
      } else if (!scrapeToPage || currentPage < scrapeToPage) {
        console.log("All available pages scraped:", currentPage);
      }
    }
  }

  await scrapePage(url, 1, null);

  console.log("Scraping finished.");
  // const result = createProduct(
  //   cardData.productName,
  //   cardData.price,
  //   cardData.boughtPastMonth
  // );

  const singleProduct = JSON.stringify(cardData[randomInt]);
  console.log(singleProduct);
  const parsedSingleProduct = JSON.parse(singleProduct);
  console.log(parsedSingleProduct);

  // Close the browser
  await browser.close();
  return parsedSingleProduct;
}

import { redirect } from "next/navigation";

export async function SignOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth-server-action");
}
