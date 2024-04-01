import { ReactNode } from "react";

export interface LocationSearch {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    url: string;
}

export default interface SearchLocationProps {
    onChangeText: (text: string) => void;
    onItemSelection: (text: string) => void;
    onFocus: () => void;
    onBlur: () => void;
    inputValue: string;
    isSelected: boolean;
    autoCompleteData: LocationSearch[] | null;
    children?: ReactNode;
}