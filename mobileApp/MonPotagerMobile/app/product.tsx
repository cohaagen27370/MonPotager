import { Appbar, Text } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

import { CompleteProduct } from "@/models/complete-product";
import { ProductType } from "@/models/productType";

export default function ProductScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [product, setProduct] = useState<CompleteProduct>();


  useEffect(() => {
    fetch('https://localhost:5001/v1/product/' + params.id, { method : 'GET' })
    .then(response => {
        if (response.ok) {
            response.json().then(data => setProduct(data));
        }
    });
  }, []);


  function getVegetableType(type: ProductType) {
    console.log(type);
    switch(type) {
      case ProductType.fruit:
        return "Fruit";
      case ProductType.fruitVegetable:
        return "Légume fruit";
      case ProductType.leafVegetable:
        return "Légume feuille";
      case ProductType.preparation:
        return "Préparation";
      case ProductType.rootVegetable:
        return "Légume racine"
      default:
        return "Autre légume";        
    }
  }


    return (<>
        { product &&
        <><Appbar.Header>
          <Appbar.BackAction onPress={() => { router.back(); } } />
          <Appbar.Content title={product.name} />
          <Appbar.Action icon="account-circle" onPress={() => { } } />
        </Appbar.Header>
        <br/>
        <View style={styles.view}>
          <View>
            <Text variant="displayMedium">{product.name}</Text>
            <Text variant="titleMedium">{product.variety}</Text>
          </View>
          <View>
            <img style={styles.image} src={"https://localhost:5001/images/" + product.image + ".webp" } />
          </View>        
        </View>
        <br/>
        <Text style={styles.center} variant="titleLarge">{ getVegetableType(product.type)}</Text>
        </>
        
        }
        </>);

}

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'space-around',
    alignItems: "center"
  },
  image : {
    borderRadius: 10
  },
  center : {
    display: 'flex',
    flexDirection : 'row',
    justifyContent: 'center'
  }
});