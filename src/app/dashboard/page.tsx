import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";
import { createProduct, readProduct } from "./actions";
import RunGenerateProducts from "@/components/RunGenerateProducts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import runScraper from "@/lib/actions";
import SignOutButton from "./components/SignOut";
import Link from "next/link";
import { BarChart } from "lucide-react";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import PageWrapper from "@/components/page-wrapper";
import SideNav from "@/components/side-nav";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
// TODO: Add signOut button top left corner

export default async function Page() {
  const { data } = await readUserSession();
  if (!data.session) {
    redirect("/auth-server-action");
  }

  const { data: products } = await readProduct();
  return (
    <div>
      <SideNav />
      <Header />
      <HeaderMobile />
      <MarginWidthWrapper>
        <PageWrapper>
          <div>
            <div className="mx-auto">
              <div className=" min-h-screen flex-col">
                <div className="flex">
                  <div className="my-20 mx-auto">
                    <RunGenerateProducts />
                  </div>
                </div>
                <div className="flex">
                  <div className="mx-auto">
                    <div className="grid grid-cols-4 gap-1  px-auto">
                      {products?.map((product, index) => {
                        if (index >= 8) {
                          return;
                        }
                        return (
                          <div key={index} className="">
                            <div className="z-40">
                              <Link
                                href={`/products/${encodeURIComponent(
                                  product.id
                                )}`}
                                className="z-40"
                              >
                                <Card className="max-w-60 max-h-60">
                                  <CardHeader>
                                    <CardDescription>
                                      {product.price}
                                    </CardDescription>
                                  </CardHeader>
                                  <CardContent>
                                    <Image
                                      src={product.imageSrc}
                                      alt="product image"
                                      width={120}
                                      height={120}
                                    />
                                  </CardContent>
                                  <CardContent>
                                    <p>{product.boughtPastMonth}</p>
                                  </CardContent>
                                </Card>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </MarginWidthWrapper>
    </div>
  );
}
