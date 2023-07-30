import dayjs from "dayjs";
import locale from "dayjs/locale/pl";
dayjs.locale({
  ...locale,
});

const dayjs_pl = dayjs().locale("pl");
