import { FC, useState } from "react";
import ChevronDown from "../assets/chevron-down.svg";
import { ISource } from "../types/news";

interface DropdownProps {
  options: ISource[];
  onSelect: (option: ISource) => void;
  selected: ISource | undefined;
}

const Dropdown: FC<DropdownProps> = ({ options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: ISource) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left ml-auto">
      <button
        className="flex w-70 px-4 py-2 text-sm text-left font-medium text-gray-800 border border-gray-300 rounded-sm shadow-sm hover:bg-gray-200"
        onClick={toggleDropdown}
      >
        {selected?.name || "Selecione uma fonte de notícias"}
        <img src={ChevronDown} alt="chevron" className="w-5 ml-auto" />
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 border border-gray-200 rounded-sm shadow-lg bg-gray-200">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className="px-4 py-2 text-sm hover:bg-gray-300 cursor-pointer"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
