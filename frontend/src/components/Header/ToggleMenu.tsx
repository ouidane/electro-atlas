"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, ChevronLeft, Menu, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import { Transition } from "react-transition-group";
import { useRouter } from "next/navigation";
import { allDepartments } from "./menuData";
import Logo from "../Logo";
import { SubCategory } from "../../../types";

export default function ToggleMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const [subContainer, setSubContainer] = useState(false);
  const [subContainerEntries, setSubContainerEntries] = useState<
    SubCategory[] | null
  >(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );

  const mainRef = useRef(null);
  const subRef = useRef(null);
  const router = useRouter();

  const onOpenChange = () => {
    setOpenMenu((prev) => !prev);
    setSubContainer(false);
    setSelectedDepartment(null);
  };

  const handleDepartmentNameClick = (categoryId: string) => {
    const params = new URLSearchParams({
      "filters[categoryId]": categoryId,
    });
    router.push(`/products?${params.toString()}`);
    setOpenMenu(false);
  };

  const handleSubcategoryClick = (subCategoryId: string) => {
    const params = new URLSearchParams({
      "filters[subCategoryId]": subCategoryId,
    });
    router.push(`/products?${params.toString()}`);
    setOpenMenu(false);
  };

  const handleChevronClick = (
    subCategories: SubCategory[],
    departmentName: string
  ) => {
    setSubContainerEntries(subCategories);
    setSubContainer(true);
    setSelectedDepartment(departmentName);
  };

  const handleBack = () => {
    setSubContainer(false);
    setSelectedDepartment(null);
  };

  return (
    <Sheet open={openMenu} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          aria-label="Browse all departments"
          className="flex items-center px-2 sm:px-4 py-2 rounded-lg bg-blue-light-5 hover:bg-blue-light-4 transition-colors duration-200 font-semibold text-dark cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-dark text-xs sm:text-sm lg:text-sm"
        >
          <Menu className="mr-1" size={18} />
          <span className="hidden sm:flex">All Departments</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="z-99999 p-0 w-[85vw] sm:w-[90vw] max-w-xs"
      >
        <SheetDescription className="sr-only">
          Navigation menu for browsing product categories and departments
        </SheetDescription>
        <SheetHeader className="bg-blue px-4 py-5 border-b border-blue-dark relative">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex-1">
              <Link href="/" className="block">
                <Logo color="white" />
              </Link>
            </SheetTitle>
            <button
              onClick={() => setOpenMenu(false)}
              className="p-2 rounded-full hover:bg-blue-dark transition-colors duration-200 text-white hover:text-white"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
        </SheetHeader>
        <div className="relative w-full h-full overflow-hidden bg-white">
          {/* Main Departments List */}
          <Transition
            nodeRef={mainRef}
            in={!subContainer}
            timeout={200}
            unmountOnExit
            mountOnEnter
          >
            {(state: string) => (
              <nav
                ref={mainRef}
                aria-label="Departments"
                className={`absolute top-0 left-0 w-full h-full bg-white z-10 transition-all duration-300 overflow-y-auto ${
                  state === "exiting"
                    ? "animate-out fade-out slide-out-to-left"
                    : state === "entering"
                    ? "animate-in fade-in slide-in-from-left"
                    : ""
                }`}
              >
                <div className="mb-4 px-4 pt-6 text-xl font-bold text-dark border-b border-gray-3 pb-3">
                  All Departments
                </div>
                <ul className="divide-y divide-gray-3">
                  {allDepartments.map((data) => (
                    <li key={data._id}>
                      <div className="flex items-center justify-between w-full">
                        <button
                          className="flex-1 py-4 px-4 rounded-lg hover:bg-blue-light-5 focus:bg-blue-light-5 transition-colors duration-200 text-dark font-medium text-base hover:text-blue focus:text-blue cursor-pointer text-left"
                          onClick={() => handleDepartmentNameClick(data._id)}
                          aria-label={`Browse ${data.name} department`}
                        >
                          <span className="capitalize">{data.name}</span>
                        </button>
                        {data.subCategories &&
                          data.subCategories.length > 0 && (
                            <button
                              className="p-2 mr-4 hover:bg-blue-light-4 focus:bg-blue-light-4 transition-colors duration-200 rounded-lg group cursor-pointer ml-2"
                              onClick={() =>
                                handleChevronClick(
                                  data.subCategories,
                                  data.name
                                )
                              }
                              aria-label={`View subcategories for ${data.name}`}
                            >
                              <ChevronRight
                                size={18}
                                className="text-gray-5 group-hover:text-blue transition-colors duration-200"
                              />
                            </button>
                          )}
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="pb-4"></div>
              </nav>
            )}
          </Transition>
          {/* Subcategories List */}
          <Transition
            nodeRef={subRef}
            in={subContainer}
            timeout={200}
            unmountOnExit
            mountOnEnter
          >
            {(state: string) => (
              <nav
                ref={subRef}
                aria-label="Subcategories"
                className={`absolute top-0 left-0 w-full h-full bg-white z-20 transition-all duration-300 overflow-y-auto ${
                  state === "exiting"
                    ? "animate-out fade-out slide-out-to-right"
                    : state === "entering"
                    ? "animate-in fade-in slide-in-from-right"
                    : ""
                }`}
              >
                <div className="flex items-center px-4 pt-6 mb-4 border-b border-gray-3 pb-3">
                  <button
                    onClick={handleBack}
                    className="mr-3 p-2 rounded-lg hover:bg-blue-light-4 focus:bg-blue-light-4 transition-colors duration-200 group cursor-pointer"
                    aria-label="Back to departments"
                  >
                    <ChevronLeft
                      size={20}
                      className="text-dark group-hover:text-blue transition-colors duration-200"
                    />
                  </button>
                  <span className="text-xl font-bold capitalize text-dark">
                    {selectedDepartment}
                  </span>
                </div>
                <ul className="divide-y divide-gray-3">
                  {subContainerEntries && subContainerEntries.length > 0 ? (
                    subContainerEntries.map(({ _id, name }) => (
                      <li key={_id}>
                        <button
                          className="w-full block py-4 px-4 rounded-lg text-left hover:bg-blue-light-5 focus:bg-blue-light-5 transition-colors duration-200 capitalize text-dark font-medium text-base hover:text-blue focus:text-blue cursor-pointer"
                          onClick={() => handleSubcategoryClick(_id)}
                          aria-label={`Browse ${name} subcategory`}
                        >
                          {name}
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-6 text-gray-5 italic text-center">
                      <div className="text-sm">No subcategories available</div>
                    </li>
                  )}
                </ul>
                <div className="pb-4"></div>
              </nav>
            )}
          </Transition>
        </div>
      </SheetContent>
    </Sheet>
  );
}
