
//use for public route don't need authentication

import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);