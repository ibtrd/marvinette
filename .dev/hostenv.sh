HOST=`hostname | cut -d '.' -f 1`
HOST=$HOST:3000

echo HOST=\"$HOST\" >> ../server/.env
echo REDIRECT_URI=\"http://$HOST/auth/callback\" >> ../server/.env