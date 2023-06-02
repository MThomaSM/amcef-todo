import React from "react";
import NewEditItem from "@/components/item/NewEditItem";
import Authenticated from "@/components/Authenticated";
const NewItemPage: React.FC = () => {
    return (
        <Authenticated>
            <NewEditItem type={"new"}/>
        </Authenticated>
    );
};

export default NewItemPage;
