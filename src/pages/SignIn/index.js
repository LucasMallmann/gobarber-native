import React from 'react';
import { Text } from 'react-native';

import Input from '~/components/Input';
import Button from '~/components/Button';

import Background from '~/components/Background';

// import { Container } from './styles';

export default function Signin() {
  return (
    <Background>
      <Text>Signin</Text>
      <Input
        icon="call"
        style={{ marginTop: 30 }}
        placeholder="Digite seu nome"
      />

      <Button>Entrar</Button>
    </Background>
  );
}
