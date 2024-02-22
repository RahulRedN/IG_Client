import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const feedtypes = [
  {
    name: "Suggestion",
  },
  {
    name: "Feedback",
  },
  {
    name: "Compliment",
  },
];

export default function Radios({ onSelectCategory }) {
  const [selected, setSelected] = useState(feedtypes[0]);

  const handleSelectionChange = (selectedValue) => {
    setSelected(selectedValue);
    onSelectCategory(selectedValue.name);
  };

  return (
    <div className="w-full px-4 py-16">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selected} onChange={handleSelectionChange}>
          <RadioGroup.Label className="sr-only">Feedback Types</RadioGroup.Label>
          <div className="flex flex-row space-x-5">
            {feedtypes.map((feedtype) => (
              <RadioGroup.Option
                key={feedtype.name}
                value={feedtype}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                      : ""
                  }
                  ${
                    checked ? "bg-blue-600/75 text-white" : "bg-blue-100 "
                  } relative flex items-center justify-center cursor-pointer rounded-lg py-5 shadow-md focus:outline-none h-30 w-56 px-8`
                }
              >
                {({ active, checked }) => (
                  <>
                    <RadioGroup.Label
                      as="p"
                      className={`font-medium text-center ${
                        checked ? "text-white" : "text-gray-900"
                      }`}
                      style={{ fontSize: "1rem" }}
                    >
                      {feedtype.name}
                    </RadioGroup.Label>
                    {checked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        {/* <CheckIcon className="ml-24 h-6 w-6 " /> */}
                      </div>
                    )}
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}