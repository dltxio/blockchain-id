import axios from "axios";
const open = axios.create({
  headers: {
    "Cache-Control": "no-store",
  },
});

export default { open };
