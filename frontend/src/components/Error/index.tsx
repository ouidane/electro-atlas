import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Link from "next/link";

interface ErrorProps {
  title?: string;
  message?: string;
  statusCode?: number;
}

const Error: React.FC<ErrorProps> = ({
  title = "Sorry, the page can’t be found",
  message = "The page you were looking for appears to have been moved, deleted or does not exist.",
  statusCode = 404,
}) => {
  return (
    <>
      <Breadcrumb title={"Error"} pages={["error"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="bg-white rounded-xl shadow-1 px-4 py-10 sm:py-15 lg:py-20 xl:py-25">
            <div className="text-center">
              <div className="text-[128px] font-bold text-blue mb-15">
                {statusCode}
              </div>
              <h2 className="font-medium text-dark text-xl sm:text-2xl mb-3">
                {title}
              </h2>
              <p className="max-w-[410px] w-full mx-auto mb-7.5">{message}</p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
