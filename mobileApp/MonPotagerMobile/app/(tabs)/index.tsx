import { Appbar } from "react-native-paper";

export default function SeedlingScreen() {

    return (<>
        <Appbar.Header>
          <Appbar.Action icon="hamburger" onPress={() => {}} />            
          <Appbar.Content title="Cultures en cours" />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>     
    </>);

}