var ros = new ROSLIB.Ros({url : 'ws://' + location.hostname + ':9000'});

ros.on('connection', function() {console.log('websocket: connected'); });
ros.on('error', function(error) {console.log('websocket error: ',' error'); });
ros.on('close', function() {console.log('websocket: closed'); });

//lightsensors
var ls = new ROSLIB.Topic({
	ros : ros,
	name : 'lightsensors',
	messageType : 'pimouse_ros/LightSensorValues'
});

ls.subscribe(function(message) {
	for( e in message) {
		document.getElementById(e).innerHTML = message[e];
	}
});

// motors
var on = new ROSLIB.Service({
	ros : ros,
	name : '/motor_on',
	messageType : 'std_srvs/Trigger'
}); 

var off = new ROSLIB.Service({
	ros : ros,
	name : '/motor_off',
	messageType : 'std_srvs/Trigger'
}); 

$('#motor_on').on('click', function(e){
	on.callService(ROSLIB.ServiceRequest(),function(result){
		if(result.success){
			$('#motor_on').attr('class','btn btn-danger');
			$('#motor_off').attr('class','btn btn-default');
		}
	});
});

$('#motor_off').on('click', function(e){
	on.callService(ROSLIB.ServiceRequest(),function(result){
		if(result.success){
			$('#motor_on').attr('class','btn btn-default');
			$('#motor_off').attr('class','btn btn-primary');
		}
	});
});

// camera
document.getElementById('camstream').data = 'http://'
	+ location.hostname
	+ ':10000/stream?topic=/cv_camera_node/image_raw';




