"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card } from "./ui/card";
import { buttonVariants } from "./ui/button";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CarouselSection = () => {
  return (
    <div className="max-w-full w-full mt-24 flex justify-center items-center gap-24">
      <div className="items-center">
        <Carousel className="max-w-lg">
          <CarouselContent className="">
            <CarouselItem className="">
              <Card>
                <Image
                  src={"/slider-wallet (1).png"}
                  alt="slider wallet"
                  width={1080}
                  height={1080}
                />
              </Card>
            </CarouselItem>
            <CarouselItem>Placeholder</CarouselItem>
            <CarouselItem>Placeholder</CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="max-w-sm flex flex-col mt-10">
        <div className="">
          <div className="flex gap-2">
            <div>
              <MagnifyingGlassIcon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">AI Product Finder</h1>
            </div>
          </div>
          <h1 className="text-3xl font-bold mt-2">
            Find{" "}
            <span className="bg-gradient-to-r from-fuchsia-500 to-indigo-600 bg-clip-text text-transparent">
              Winning Products
            </span>{" "}
            Using AI
          </h1>
          <p className="mt-4 text-zinc-400">
            Get your hands on winning products before they get saturated
          </p>
        </div>
        <div className="mx-auto mt-6">
          <Link
            className={buttonVariants({ variant: "default" })}
            href={"/login"}
          >
            Get started
            <ArrowRight className="pl-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
