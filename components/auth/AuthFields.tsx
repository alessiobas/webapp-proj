import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import { showMessage } from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';


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
        <SafeAreaView style={Base.container}>
            <Text></Text>
            <Text style={Base.iconLogin}>*************************
            <Ionicons name="person-outline" color="grey" size={60} marginLeft={100}></Ionicons>
            </Text>
            <Text style={Typography.header2Login}>Min sida</Text>
            <Text style={Typography.labelInfo}>Gör dina resor ännu smidigare genom att logga in!</Text>
            <Text style={Typography.labelLogin}>E-post</Text>
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
            <TouchableOpacity
                style={Base.loginButton}
                title={title}
                onPress={() => {
                    submit();
                }}
            >
            <Text style={Typography.loginBtnTxt}>{title}</Text>
            </TouchableOpacity>
            {title === "Logga in" &&
                <TouchableOpacity
                    style={Base.registerButton}
                    title="Registrera istället"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                >
                    <Text style={Typography.loginBtnTxt}>Registrera istället</Text>
                    </TouchableOpacity>
            }
        </SafeAreaView>
    );
};