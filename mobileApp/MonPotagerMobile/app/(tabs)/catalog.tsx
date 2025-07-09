import { ActivityIndicator, Appbar, MD2Colors, Text, TextInput } from "react-native-paper";
import { useEffect, useState } from "react";

import Data from "@/models/data";
import Item from "@/components/Item";
import Product from "@/models/product";
import { useRouter } from "expo-router";

export default function CatalogScreen() {
    const [text, setText] = useState("");
    const [mostWantedProducts, setMostWantedProducts] = useState<Array<Product>>([]);
    const [products, setProducts] = useState<Data<Product>>();
    const [loading, setLoading] = useState<Boolean>(false);
    const router = useRouter();


    useEffect(() => {

        setLoading(true);
        fetch('https://localhost:5001/v1/products/mostwanted', { method : 'GET' })
        .then(response => {
            if (response.ok) {
                response.json().then(data => setMostWantedProducts(data));
            }
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (text.length >= 3)
        {
            setLoading(true);            
            fetch('https://localhost:5001/v1/products?q=' + text, { method : 'GET' })
            .then(response => {
                if (response.ok) {
                    response.json().then(data => setProducts(data));
                }
                setLoading(false);
            });            
        }
        else
        {
            setProducts(undefined);
        }
    },[text]);

    return (<>
        <Appbar.Header>
          <Appbar.Action icon="hamburger" onPress={() => {}} />            
          <Appbar.Content title="Plantothèque" />
          <Appbar.Action icon="account-circle" onPress={() => {}} />
        </Appbar.Header>   
        <TextInput
            label="Chercher des plantes"
            value={text}
            onChangeText={text => setText(text)}
            right={<TextInput.Icon icon="close" onPress={() => setText('')} />}
        />
        { loading && <ActivityIndicator animating={true} color={MD2Colors.red800} />}

        { !loading && !products && mostWantedProducts.map(product => <div key={product.id} onClick={() => {setText(product.name)}}><Item id={product.id} key={product.id} variety={product.variety} name={product.name} image={product.image} count={product.count} /></div>)}
        { !loading && products?.datas.map(product => <div key={product.id} onClick={() => {router.push(`/product?id=${product.id}`)}}><Item id={product.id} key={product.id} variety={product.variety} name={product.name} image={product.image} count={0} /></div>)}
        { !loading && products && products.count == 0 && <Text variant="headlineSmall">Aucun enregistrement</Text>}
    </>);

}