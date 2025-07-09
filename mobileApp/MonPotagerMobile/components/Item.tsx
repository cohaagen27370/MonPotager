import { Card } from "react-native-paper";
import Product from "@/models/product";
import { StyleSheet } from "react-native";

const Item = (product: Product) => {
    return <Card mode='elevated' style={styles.card}>
                <Card.Title key={product.id} title={product.name} subtitleStyle={styles.title} subtitle={product.variety ? product.variety : ''} titleStyle={styles.title} left={() => <img style={styles.image} src={"https://localhost:5001/images/" + product.image + ".webp" } />} />
            </Card>;
}

const styles = StyleSheet.create({
  card: {
    marginLeft:5,
    marginRight:5,
    marginTop:5,
    marginBottom:5
  },
  image : {
    width: 71,
    marginLeft: -16,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  title : {
    marginLeft:23
  }
});

export default Item;