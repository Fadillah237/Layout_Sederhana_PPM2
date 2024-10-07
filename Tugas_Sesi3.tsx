import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState, useRef } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [editId, setEditId] = useState<number | null>(null); // Menyimpan ID yang sedang diedit
  const inputRef = useRef<TextInput>(null); // Ref untuk mengontrol TextInput

  // Fungsi untuk menambahkan todo baru atau mengedit todo yang sudah ada
  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }
    if (editId) {
      // Jika dalam mode edit
      const updatedTodos = todo.map(item =>
        item.id === editId ? { ...item, title } : item
      );
      setTodo(updatedTodos);
      setEditId(null); // Keluar dari mode edit
    } else {
      // Jika dalam mode tambah
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }
    setTitle('');
    inputRef.current?.focus(); // Fokuskan kembali pada TextInput setelah menambahkan todo
  };

  // Fungsi untuk menghapus todo berdasarkan id
  const handleDeleteTodo = (id: number) => {
    const filteredTodos = todo.filter(item => item.id !== id);
    setTodo(filteredTodos);
  };

  // Fungsi untuk mengedit todo
  const handleEditTodo = (id: number) => {
    const todoToEdit = todo.find(item => item.id === id);
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setEditId(id); // Masuk ke mode edit
      inputRef.current?.focus(); // Fokuskan pada TextInput saat mengedit
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 10, marginTop: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
          gap: 10,
        }}
      >
        <TextInput
          ref={inputRef} // Ref untuk TextInput
          placeholder="Enter your todo"
          style={{
            flex: 1,
            borderColor: 'black',
            borderWidth: 1,
            padding: 10,
          }}
          value={title}
          onChangeText={setTitle}
          autoCorrect={false} // Disable autocorrect
          autoCapitalize="none" // Disable auto-capitalization
          editable={true} // Pastikan input bisa diedit
        />
        <Pressable
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            height: 40,
          }}
          onPress={handleAddTodo}
        >
          <Text style={{ color: 'white' }}>{editId ? 'Edit Todo' : 'Add Todo'}</Text>
        </Pressable>
      </View>

      {todo.map(item => (
        <View
          key={item.id}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 18, color: 'black' }}>{item.title}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable
              onPress={() => handleEditTodo(item.id)}
              style={{ backgroundColor: 'orange', padding: 5, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() => handleDeleteTodo(item.id)}
              style={{ backgroundColor: 'red', padding: 5, borderRadius: 5 }}
            >
              <Text style={{ color: 'white' }}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TodoList;
