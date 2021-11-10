import { excerpt } from "~util";

const Excerpt = ({text, length, terminator = '...'}) => excerpt(text, length, terminator);

export default Excerpt;