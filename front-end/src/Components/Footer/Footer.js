import { Typography } from "@mui/material";
import "./Footer.css";

export const Footer = () => {
    return (
        <footer
            className="flex w-[95%] flex-row justify-center border-t opacity-60 py-6 px-10 mx-auto mt-10 text-center md:justify-evenly">
            <div>
                <Typography color="blue-gray" className="font-light text-xs">
                    &copy; 2023 NFT Wheels All Rights Reserved.
                </Typography>
            </div>
        </footer>
    );
}