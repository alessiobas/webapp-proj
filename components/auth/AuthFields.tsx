import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { showMessage } from 'react-native-flash-message';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {

    function validatePassword(text: string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,100}$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Ej giltigt lösenord",
                description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver och minst en siffra",
                type: "warning"
            });
        }
    }

    function validateEmail(text: string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!text.match(pattern)) {
            showMessage({
                message: "Ej giltig email",
                description: "Email måste vara formaterad enligt aaaa@aaa.aa",
                type: "warning"
            });
        }
    }

    return (
        <View style={Base.container}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validateEmail(content)
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Text style={Typography.label}>Lösenord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};