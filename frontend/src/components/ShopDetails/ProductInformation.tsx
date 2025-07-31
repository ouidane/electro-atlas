import React from "react";
import { Info, Box, ListChecks } from "lucide-react";

interface ProductInformationProps {
  description?: string;
  whatsInTheBox?: string[];
  specifications?: { [key: string]: string };
}

const ProductInformation: React.FC<ProductInformationProps> = ({
  description,
  whatsInTheBox,
  specifications,
}) => {
  if (
    !description &&
    (!whatsInTheBox || whatsInTheBox.length === 0) &&
    (!specifications || Object.keys(specifications).length === 0)
  ) {
    return null;
  }

  return (
    <section className="overflow-hidden bg-white">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
        <h3 className="flex items-center gap-2 text-xl font-bold mb-6">
          Product Information
        </h3>

        {/* Description */}
        {description && (
          <div className="mb-8">
            <h4 className="flex items-center gap-2 font-semibold text-blue mb-2 text-lg">
              <Info className="w-5 h-5 text-blue" />
              Description
            </h4>
            {description
              .split(/\[\d+\]/g)
              .filter((part) => part.trim() !== "")
              .map((part, idx) => (
                <p
                  key={idx}
                  className="text-meta-2 whitespace-pre-line leading-relaxed text-base md:text-[15px]"
                >
                  {part.trim()}
                </p>
              ))}
          </div>
        )}

        {/* What's in the Box */}
        {whatsInTheBox && whatsInTheBox.length > 0 && (
          <div className="mb-8">
            <h4 className="flex items-center gap-2 font-semibold text-blue mb-2 text-lg">
              <Box className="w-5 h-5 text-green" />
              What&apos;s in the Box
            </h4>
            <ul className="list-disc list-inside text-meta-2 text-sm md:text-base space-y-1 pl-2">
              {whatsInTheBox.map((item, idx) => (
                <li key={idx} className="marker:text-green">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Specifications */}
        {specifications && Object.keys(specifications).length > 0 && (
          <div className="mb-2 overflow-x-auto">
            <h4 className="flex items-center gap-2 font-semibold text-blue mb-2 text-lg">
              <ListChecks className="w-5 h-5 text-yellow" />
              Specifications
            </h4>
            <table className="min-w-full text-sm text-left text-meta-2 border border-gray-3 rounded-lg">
              <tbody>
                {Object.entries(specifications).map(([key, value], idx) => (
                  <tr
                    key={key}
                    className={idx % 2 === 0 ? "bg-white" : "bg-gray-2"}
                  >
                    <td className="pr-4 py-2 font-medium text-dark-2 whitespace-nowrap">
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                    </td>
                    <td className="py-2 text-meta-3 whitespace-nowrap">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductInformation;
