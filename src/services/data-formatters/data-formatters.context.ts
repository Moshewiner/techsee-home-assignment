import { BugsFormatter } from './bugs-formatter/bugs-formatter.service';
import { createContext } from "react";
import { DataFormatter } from "./data-formatters.types";
import { TesterData } from '../../pages/home/home-page.types';

export const DataFormatterContext = createContext<DataFormatter<TesterData[]>>(new BugsFormatter());
