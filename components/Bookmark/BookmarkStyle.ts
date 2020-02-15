import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 1
  },
  padding: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  imageContainer: {
    width: '100%',
    height: 150
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
    borderRadius: 8
  },
  textContent: {
    maxHeight: 150,
    minHeight: 50,
    overflow: 'hidden'
  },
  leftAction: {
    justifyContent: 'center',
    flex: 0.5,
    marginRight: 20
  },
  leftActionBtn: {
    backgroundColor: '#000'
  },
  rightAction: {
    justifyContent: 'center',
    flex: 0.5,
    marginLeft: 20
  },
  rightActionBtn: {
    backgroundColor: '#F56565'
  }
})

export default styles;
