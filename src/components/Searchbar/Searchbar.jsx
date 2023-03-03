import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  SearchbarWrap,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from "./Searchbar.styled";

export function Searchbar({onSubmit}) {
  const [inputName, setInputName] = useState('');

  const handleChange = (event) => {
    const { value } = event.currentTarget;
    setInputName(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputName.trim() === "") {
      toast.warn("🦄 Please enter something");
      return;
    }
    onSubmit(inputName.toLocaleLowerCase());
    reset();
  };

  const reset = () => {
    setInputName('');
  };

    return (
      <>
        <SearchbarWrap>
          <SearchForm onSubmit={handleSubmit}>
            <SearchFormButton type="submit">
              <SearchFormButtonLabel>
                <FaSearch />
              </SearchFormButtonLabel>
            </SearchFormButton>

            <SearchFormInput
              type="text"
              autocomplete="off"
              // autofocus
              placeholder="Search images and photos"
              value={inputName}
              onChange={handleChange}
            />
          </SearchForm>
        </SearchbarWrap>
      </>
    );
  }
