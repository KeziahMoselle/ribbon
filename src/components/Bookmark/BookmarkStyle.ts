import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row'
  },
  container: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 1,
    marginBottom: 26
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    borderRadius: 8,
    flex: 1,
    height: undefined,
    resizeMode: 'cover',
    width: undefined
  },
  imageContainer: {
    height: 150,
    width: '100%'
  },
  leftAction: {
    flex: 0.5,
    justifyContent: 'center',
    marginRight: 20
  },
  leftActionBtn: {
    backgroundColor: '#000'
  },
  padding: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  rightAction: {
    flex: 0.5,
    justifyContent: 'center',
    marginLeft: 20
  },
  rightActionBtn: {
    backgroundColor: '#F56565'
  },
  textContent: {
    maxHeight: 150,
    minHeight: 50,
    overflow: 'hidden'
  }
})

export default styles
