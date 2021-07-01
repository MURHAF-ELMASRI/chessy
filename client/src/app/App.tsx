import { useState, useEffect } from 'react';
import Game from '../components/Board/Game';
import { Grid, Typography, Button } from '@material-ui/core';
import SideWindow from '../components/sideWindow/SideWindow';
import useNotification from '../hooks/useNotification';
import DialogComponent from '../components/DialogComponent';
import NotificationComponent from '../components/NotificationComponent';
import useAuth from '../hooks/useAuth';
import useWebSocket from '../hooks/useWebSocket';
import windowClose from '@iconify-icons/mdi/window-close';
import useDialog from '../hooks/useDialog';
import { Icon } from '@iconify/react';
import firebase from 'firebase';

export default function App() {
    const [logs, setLogs] = useState([]);
    const [mv, setMv] = useState('');
    const [player, setPlayer] = useState(true);
    const [startGame, setStartGame] = useState(false);
    const { setNoti } = useNotification();
    const { user, setUser } = useAuth();
    const { webSocket, setWebSocket } = useWebSocket();
    const { setDialogState } = useDialog();
    const [turn, setTurn] = useState('wait');
    useEffect(() => {
        function mobileCheck() {
            let check = false;
            (function (a) {
                if (
                    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                        a
                    ) ||
                    // eslint-disable-next-line no-useless-escape
                    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
                        a.substr(0, 4)
                    )
                )
                    check = true;
            })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }

        //todo: HANDLE UNABILITY FOR CONNECTION HOW?? RETRY CONNECTION
        if (user.uid) {
            let URI;
            //! danger: this approuch is unscure in http connction
            //CONNECT ON LOCAL NETWORK
            if (!webSocket || webSocket.readyState === webSocket.CLOSED) {
                URI = 'wss://chessyrealtime.herokuapp.com/';
                URI = URI + '?token=' + user.token;
                const webSocket = new WebSocket(URI);
                setWebSocket(webSocket);

                if (webSocket) {
                    webSocket.onopen = (e) => {
                        webSocket.onmessage = (msg) => {
                            const parsedMsg = JSON.parse(msg.data);
                            console.log('comming message', parsedMsg.msg);
                            if (parsedMsg.msg === 'move') {
                                console.log('moving');
                                if (parsedMsg.move) setMv(parsedMsg.move);
                            } else if (parsedMsg.msg === 'chat') {
                                console.log('chat');
                            } else if (parsedMsg.msg === 'request-play') {
                                console.log('request-play hit');
                                setDialogState({
                                    open: true,
                                    title: `${
                                        parsedMsg.name
                                    } want to play with ${
                                        parsedMsg.color ? 'white' : 'black'
                                    } stone`,
                                    actions: (
                                        <>
                                            <Button
                                                onClick={() => {
                                                    webSocket.send(
                                                        JSON.stringify({
                                                            msg: 'accept-play',
                                                            color: parsedMsg.color,
                                                        })
                                                    );
                                                    setDialogState((prev) => ({
                                                        ...prev,
                                                        open: false,
                                                    }));
                                                    setUser((prev) => ({
                                                        ...prev,
                                                        state: 'busy',
                                                    }));
                                                    setLogs(['']);
                                                    setTurn(!parsedMsg.color);
                                                    setStartGame(true);
                                                    setPlayer(!parsedMsg.color);
                                                    setNoti({
                                                        open: true,
                                                        severity: 'success',
                                                        content:
                                                            'Game stated 🏁',
                                                    });
                                                    console.log('accept-play');
                                                    setTimeout(() => {
                                                        setNoti((prev) => ({
                                                            ...prev,
                                                            open: false,
                                                        }));
                                                    }, 3000);
                                                }}
                                            >
                                                yes
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    webSocket.send(
                                                        JSON.stringify({
                                                            msg: 'reject-play',
                                                        })
                                                    );
                                                    setDialogState((prev) => ({
                                                        ...prev,
                                                        open: false,
                                                    }));
                                                }}
                                            >
                                                NO
                                            </Button>
                                        </>
                                    ),
                                });
                            } else if (parsedMsg.msg === 'reject-play') {
                                setNoti({
                                    open: true,
                                    severity: 'error',
                                    content: (
                                        <>
                                            <Typography>
                                                {parsedMsg.name} reject your
                                                invinting
                                            </Typography>
                                            <Button
                                                onClick={() => {
                                                    setNoti((prev) => ({
                                                        ...prev,
                                                        open: false,
                                                        severity: 'info',
                                                    }));
                                                }}
                                                style={{ width: '10px' }}
                                            >
                                                <Icon icon={windowClose} />
                                            </Button>
                                        </>
                                    ),
                                });
                            } else if (parsedMsg.msg === 'error') {
                                setNoti({
                                    open: true,
                                    severity: 'error',
                                    content: parsedMsg.content,
                                });
                                setTimeout(() => {
                                    setNoti({
                                        open: false,
                                        severity: 'error',
                                        content: parsedMsg.content,
                                    });
                                }, 1500);
                            } else if (parsedMsg.msg === 'accept-play') {
                                setTurn(parsedMsg.color);
                                setPlayer(parsedMsg.color);
                                setUser((prev) => ({
                                    ...prev,
                                    state: 'busy',
                                }));
                                setStartGame(true);
                                setLogs(['']);
                                setNoti({
                                    open: true,
                                    severity: 'success',
                                    content: 'Game stated 🏁',
                                });
                                console.log('accept-play');
                                setTimeout(() => {
                                    setNoti((prev) => ({
                                        ...prev,
                                        open: false,
                                    }));
                                }, 3000);
                            } else if (parsedMsg.msg === 'win') {
                                setTurn('wait');
                                setNoti({
                                    open: true,
                                    severity: 'success',
                                    content: 'Congrats you win 💪🥳🎉',
                                });
                                setTimeout(() => {
                                    setNoti((prev) => ({
                                        ...prev,
                                        open: false,
                                    }));
                                }, 3000);
                            }
                        };
                    };
                }
                webSocket.onerror = (e) => {
                    setTimeout(
                        () =>
                            setNoti({
                                open: true,
                                content: 'Error connection with server',
                                severity: 'error',
                            }),
                        3000
                    );
                };
            }
        } else {
            if (webSocket) webSocket.close();
        }
    }, [user, setWebSocket]);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                const token = await firebase.auth().currentUser.getIdToken();

                const u = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: firebase.auth().currentUser.photoURL,
                    token,
                    state: 'online',
                };
                firebase.database().ref('users').child(user.uid).update({
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: firebase.auth().currentUser.photoURL,
                    state: 'online',
                });
                setUser(u);
            } else {
                setUser('');
                setTurn('wait');
                if (webSocket) webSocket.close();
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <>
            <DialogComponent />
            <NotificationComponent />
            <Grid
                container
                style={{
                    overflow: 'hidden',
                    height: '100vh',
                    backgroundColor: '#525252',
                }}
            >
                <SideWindow />

                <Grid
                    item
                    container
                    justify="center"
                    alignItems="center"
                    sm={3}
                >
                    <Grid
                        item
                        style={{
                            height: '200px',
                            overflowX: 'hidden',
                            overflowY: 'scroll',
                            padding: '2rem',
                            width: '100%',
                        }}
                    >
                        {logs.map((e, i) => (
                            <Typography key={i} component={'h1'}>
                                {e}
                            </Typography>
                        ))}
                    </Grid>
                </Grid>

                <Grid
                    item
                    sm={6}
                    container
                    justify="center"
                    alignItems="center"
                >
                    <Game
                        setLogs={setLogs}
                        player={player}
                        mv={mv}
                        setMv={setMv}
                        turn={turn}
                        setTurn={setTurn}
                        startGame={startGame}
                        setStartGame={setStartGame}
                    />
                </Grid>
            </Grid>
        </>
    );
}
