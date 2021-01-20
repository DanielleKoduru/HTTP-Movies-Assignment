import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialFormObject = {
    title: "",
    director: "",
    metascore: "",
    stars: [""],
}