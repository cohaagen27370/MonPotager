import { Appbar } from "react-native-paper";

export default function StockScreen() {

    return (<>   
        <Appbar.Header>
          {/* <Appbar.BackAction onPress={() => {}} /> */}
          <Appbar.Action icon="hamburger" onPress={() => {}} />            
          <Appbar.Content title="Mon stocks" />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>         
    </>);

}