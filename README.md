# Installation
## Sources
Install node : http://joshondesign.com/2013/10/23/noderpi
git clone project
npm install
cd public
bower install

For serialport :
    install node-pre-gyp
sudo npm install -g node-pre-gyp
node-pre-gyp configure
    compile serialport sources
cd node_modules/serialport
node-pre-gyp build

## Database
install mongodb : http://raspbian-france.fr/installer-mongodb-raspberry-pi/

# Run
Website address :
localhost:3000/dashboard
