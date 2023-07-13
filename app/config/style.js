import colors from "./colors"
import Constants from "expo-constants";

export default {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    screen: {
        paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.light,
    },
    view: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        marginBottom: 20,
        width: '100%',
        paddingVertical: 15,
      },
      heading: {
        color: colors.light,
        fontSize: 22,
        fontWeight: 'bold',
      }
}