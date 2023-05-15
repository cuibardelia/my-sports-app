import * as React from 'react';
import { useState } from 'react';
import { OptionMapping, OptionMappingKeys } from '../../Types';
import {
  DropdownContainer, DropdownHeader, DropdownList, DropdownListItem,
} from './Dropdown.css';

type DropdownProps = {
  options: OptionMappingKeys[];
  selectedOption: OptionMappingKeys;
  onOptionChange: (option: OptionMappingKeys) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, selectedOption, onOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onOptionChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer>
      <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
        Choose Stats
      </DropdownHeader>
      {isOpen && (
      <DropdownList>
        {options?.map((option) => (
          <DropdownListItem key={option} onClick={() => handleOptionClick(option)}>
            {OptionMapping[option]}
          </DropdownListItem>
        ))}
      </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default Dropdown;
