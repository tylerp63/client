"use server";
import { readProduct, readProductById } from "@/app/dashboard/actions";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import PageWrapper from "@/components/page-wrapper";
import SideNav from "@/components/side-nav";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import readUserSession from "@/lib/actions";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import Image from "next/image";

type Product = {
  id: string;
  productName: string;
  price: string;
  boughtPastMonth: string;
  imageSrc: string;
};
export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  //   const { data } = await readUserSession();
  //   if (!data.session) {
  //     redirect("/auth-server-action");
  //   }

  // function getProductById(id: string) {

  //   if (products) {
  //     for (const product of products) {
  //       if (product.id != id) {
  //         return 0;
  //       } else {
  //         return product;
  //       }
  //     }
  //   }
  //   return null;
  // }
  // const product = getProductById(id ?? "");
  console.log(params.id);

  const { data: products } = await readProductById(params.id);
  const product: Product = products[0];
  console.log(product);
  console.log(product.productName);
  return (
    <>
      <SideNav />
      <Header />
      <HeaderMobile />
      <MarginWidthWrapper>
        <PageWrapper>
          <div>
            <div className="mx-auto">
              <div className="min-h-screen flex-col">
                <div className="flex">
                  <div className="my-20 mx-auto">
                    <Card className="max-w-80 max-h-80">
                      <Image
                        src={product.imageSrc}
                        alt="product image"
                        width={140}
                        height={140}
                      />
                    </Card>
                    <div className="flex">
                      <div className="mx-auto h-10 w-60 rounded-lg mt-20">
                        <Card className="min-w-40 min-h-40">
                          <h1 className="px-2 py-2 font-semibold">
                            {product.productName}
                          </h1>
                          <h1>{product.price}</h1>
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </MarginWidthWrapper>
    </>
  );
}
