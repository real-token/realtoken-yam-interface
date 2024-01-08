import { Combobox, useCombobox, InputBase } from "@mantine/core";
import { useState } from "react";

interface SelectCreatableProps{
    data: string[];
    value: string | null;
    setValue: (value: string | null) => void;
}
export function SelectCreatable({ data: values, value, setValue }: SelectCreatableProps) {
    const combobox = useCombobox({
      onDropdownClose: () => combobox.resetSelectedOption(),
    });
  
    const [data, setData] = useState<string[]>(values);
    const [search, setSearch] = useState('');
  
    const exactOptionMatch = data.some((item) => item === search);
    const filteredOptions = exactOptionMatch
      ? data
      : data.filter((item) => item.toLowerCase().includes(search.toLowerCase().trim()));
  
    const options = filteredOptions.map((item) => (
      <Combobox.Option value={item} key={item}>
        {item}
      </Combobox.Option>
    ));
  
    return (
      <Combobox
        store={combobox}
        withinPortal={false}
        onOptionSubmit={(val) => {
          if (val === '$create') {
            setData((current) => [...current, search]);
            setValue(search);
          } else {
            setValue(val);
            setSearch(val);
          }
  
          combobox.closeDropdown();
        }}
      >
        <Combobox.Target>
          <InputBase
            rightSection={<Combobox.Chevron />}
            value={search}
            onChange={(event) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(event.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => {
              combobox.closeDropdown();
              setSearch(value || '');
            }}
            placeholder="Search value"
            rightSectionPointerEvents="none"
          />
        </Combobox.Target>
  
        <Combobox.Dropdown>
            <Combobox.Options>
                {options}
                {!exactOptionMatch && search.trim().length > 0 && (
                    <Combobox.Option value="$create">+ Create {search}</Combobox.Option>
                )}
            </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    );
  }