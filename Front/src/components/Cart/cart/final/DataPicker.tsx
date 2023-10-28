import { Datepicker } from '@ijavad805/react-datepicker';
import moment from 'moment';
// simple

// full options
function Datepickers({ setDate }) {
  return (
    <div className="w-full bg-red-300 ">
      <Datepicker
        footer={(moment, setValue) => {
          return (
            <>
              <div
                onClick={() => {
                  if (setValue) setValue(moment());
                }}
              >
                امروز
              </div>
            </>
          );
        }}
        closeWhenSelectADay={true}
        disabled={false} // disable input
        disabledDate={(day) => day < moment()} // today should be disabled
        format={'YYYY-MM-DD'}
        input={
          <input
            className="w-full focus:outline-none border rounded-md py-2"
            placeholder="Select a date"
          />
        } // whatever you want
        onOpen={() => {
          console.log('datepicker is open');
        }}
        lang={'fa'} // en and fa
        loading={false} // show loading in datepicker if is open
        modeTheme={'light'} // dark and light
        theme={'blue'} // blue , orange , red , green , yellow
        defaultValue={moment()}
        adjustPosition={'auto'} // auto, right-top, left-top, right-bottom, left-bottom, modal
        onChange={(val: any) => {
          console.log(val.format());
          setDate(val.format());
        }}
      />
    </div>
  );
}
export default Datepickers;
