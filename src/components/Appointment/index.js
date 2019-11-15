import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import { ConfirmDialog } from 'react-native-simple-dialogs';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointments({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.date]);

  const [modalVisible, setModalVisible] = useState(false);

  function handleConfirm() {
    onCancel();
    setModalVisible(false);
  }

  return (
    <Container past={data.past}>
      <ConfirmDialog
        title="Excluir o agendamento"
        message="Tem certeza que deseja excluir seu agendamento?"
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(false)}
        positiveButton={{
          title: 'Sim',
          onPress: handleConfirm,
        }}
        negativeButton={{
          title: 'Não',
          onPress: () => setModalVisible(false),
        }}
      />

      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? `http://10.0.3.2:3333/files/${data.provider.avatar.path}`
              : `https://api.adorable.io/avatar/50/${data.provider.id}`,
          }}
        />

        <Info>
          <Name>{data.provider.name}</Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>

      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointments.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    past: PropTypes.bool,
    provider: PropTypes.shape({
      avatar: PropTypes.shape({
        url: PropTypes.string,
        path: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};
