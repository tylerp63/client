import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import MarginWidthWrapper from "@/components/margin-width-wrapper";
import PageWrapper from "@/components/page-wrapper";
import SideNav from "@/components/side-nav";
import { Button } from "@/components/ui/button";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

import React from "react";

const Copywriter = async () => {
  const { data } = await readUserSession();
  if (!data.session) {
    redirect("/auth-server-action");
  }
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
                    <Button>Start copywriting</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PageWrapper>
      </MarginWidthWrapper>
    </>
  );
};

export default Copywriter;
