import dayjsLib from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import locale from 'dayjs/locale/ru';

dayjsLib.extend(utc);
dayjsLib.extend(timezone);
dayjsLib.tz.setDefault('GMT');
dayjsLib.locale(locale);

export const dayjs = dayjsLib.utc;

