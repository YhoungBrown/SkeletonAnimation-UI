import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import consoleOveride from './consoleOverride/consoleOverride'
import ContactListItem from './components/ContactListItem';





export default function App() {
  const [contacts, setContacts] = useState([])
  
  const contactPlaceholderList = useMemo(() => {
    return Array.from({length: 15}).map(() => null)
  }, [])

  const fetchContacts = useCallback( async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()
   // console.log(data);

    //wait for 5000ms to give skeleton loading more time (the promise below ain't compulsory nor required.)
    await new Promise(resolve => setTimeout(resolve, 5000));
    setContacts(data);
  }, [])


  useEffect(() => {
    fetchContacts();

  }, []);

  console.log(contacts)

  return (
    <View style={styles.container}>
      {(contacts.length === 0 || !contacts) && (
        <View >
          {/* Add your shadow styles here */}
          <FlatList
            data={contactPlaceholderList}
            ItemSeparatorComponent={() => (
              <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#CED0CE' }}
              />
            )}
            renderItem={({ item }) => <ContactListItem item={item} />}
          />
        </View>
      )}

      {contacts.length > 0 && (
        <FlatList
          data={contacts}
          ItemSeparatorComponent={() => (
            <View
              style={{ height: 0.5, width: '100%', backgroundColor: '#CED0CE' }}
            />
          )}
          renderItem={({ item }) => <ContactListItem item={item} />}
        />
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15
  },
});
