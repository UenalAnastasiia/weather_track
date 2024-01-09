import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const HistoryDatepicker = ({ setStartDate, setEndDate, dateFormat, startDate, endDate }) => {
    const minDateData = dayjs('01/01/2000');
    const maxDateData = dayjs().add(-2, 'day');

    const sxStyle = {
        picker: {
            label: { color: 'white !important', fontFamily: 'Baloo !important' },
            input: { color: 'white !important', width: '150px !important', fontFamily: 'Baloo !important' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white', fontFamily: 'Baloo !important' }, '&:hover fieldset': { borderColor: 'white' },
                '&.Mui-focused fieldset': { borderColor: 'white' } },
            svg: { color: 'white !important' }
        } 
    }


    const dateValue = (date, period) => {
        let result = dateFormat(date);
        period === 'start' ? setStartDate(result) : setEndDate(result);
    }


    const disablePrevDates = (startDate) => {
        const startSeconds = Date.parse(startDate);
        return (date) => {
          return Date.parse(date) > startSeconds;
        } 
    }


    const onKeyDown = (e) => {
        e.preventDefault();
    };
    

    return (
        <div className="datepickerFields">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Start Date" disableFuture shouldDisableDate={disablePrevDates(endDate)}
                    onChange={(date) => { dateValue(date, 'start')}} 
                    slotProps={{textField: {helperText: 'MM/DD/YYYY', placeholder: 'Enter start date', onKeyDown: onKeyDown}}}
                    sx={sxStyle.picker} 
                    minDate={minDateData} maxDate={maxDateData} />

                <span>-</span>

                <DatePicker label="End Date" disableFuture
                    onChange={(date) => { dateValue(date, 'end')}}                                        
                    slotProps={{textField: {helperText: 'MM/DD/YYYY', placeholder: 'Enter end date', onKeyDown: onKeyDown}}}
                    sx={sxStyle.picker} 
                    minDate={dayjs(startDate)} maxDate={maxDateData}/>
            </LocalizationProvider>
        </div>
    );
};

export default HistoryDatepicker