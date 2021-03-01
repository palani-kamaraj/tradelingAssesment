import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../utils/hooks/useClickOutside";
import "./dropdown.scss";

interface DropdownProps {
  options: Array<string> | Array<any>;
  optionKey?: string;
  defaultHeading?: string;
  defaultValue?: string;
  onChange?: (value: any) => void;
}

const Dropdown = (props: DropdownProps): JSX.Element => {
  const {
    options = [],
    defaultValue = "",
    defaultHeading = "Select Options",
    optionKey = "",
    onChange = () => {},
  } = props;
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(
    defaultValue
  );
  const setOptionKey = optionKey as keyof typeof options;
  const setOptionsKey: any =
    optionKey && options[setOptionKey] ? options[setOptionKey] : selectedOption;

  const onToggle = () => setIsOpen(!isOpen);

  const onOptionClicked = (value: any) => {
    const val = value[setOptionKey] || value;
    setSelectedOption(val);
    setIsOpen(false);
    onChange(value);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className="Dropdown">
      <div className="headingWrapper flex-vh-center" onClick={onToggle}>
        <h6 className="header">{setOptionsKey || defaultHeading}</h6>
        <span className="downArrow"></span>
      </div>
      {isOpen && (
        <ul className="optionsWrapper">
          {options &&
            options.length > 0 &&
            options.map((item: any, index: number) => (
              <li key={index} onClick={() => onOptionClicked(item)}>
                {optionKey && item[setOptionKey] ? item[setOptionKey] : item}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
