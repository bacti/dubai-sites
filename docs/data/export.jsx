var AA_DEBUG_LOG = [];
var log = function(data)
{
    AA_DEBUG_LOG.push(data);
}
app.project.save()
app.activate()

var videoLayers = [];
var solidLayers = [];

var result = { trackings: [] };

var LoadFootage = function(composition)
{
    for (var i = 1; i <= composition.numLayers; ++i)
    {
        var layer = composition.layer(i);
        if (!layer.source) continue;
        if (layer.source.file)
        {
            videoLayers.push(layer);
        }
        else
        {
            solidLayers.push(layer);
        }
    }
}

var LoadProject = function()
{
    var procjectLength = app.project.items.length;

    for (var i = 1; i <= procjectLength; ++i)
    {
        var item = app.project.items[i];
        if (item.typeName == 'Composition')
        {
            LoadFootage(item);
        }
    }
}

var ProLayer = function()
{
    for (var i = 0; i < videoLayers.length; ++i)
    {
        var layer = videoLayers[i];
        var video = {};
        video.width = layer.width;
        video.height = layer.height;
        video.inPoint = layer.inPoint;
        video.outPoint = layer.outPoint;
        //video.frameDuration = layer.source.frameDuration;
        //video.frameRate = layer.source.frameRate;
        result.frameRate = layer.source.frameRate;
       // log(layer.source.file);
        result.video = video;
        result.width = video.width;
        result.height = video.height;
    }
    var frameDuration = 1/ result.frameRate;
    for (var i = 0; i < solidLayers.length; ++i)
    {
        var layer = solidLayers[i];
        var solid = {};
        solid.width = layer.width;
        solid.height = layer.height;
        solid.inPoint = layer.inPoint;
        solid.outPoint = layer.outPoint;
        solid.frames = [];
        for (var time = solid.inPoint; time <  solid.outPoint;  time +=   frameDuration)
        {
            var frame = {};
            var scalefv = layer.scale.valueAtTime(time, false);
            frame.scale = [scalefv[0]/100, scalefv[1]/100];
            var posfv = layer.position.valueAtTime(time, false);               
            frame.uv = [posfv[0]/ result.width,posfv[1]/result.height];
            solid.frames.push(frame);
        }
        result.trackings.push(solid);
    }
}


var SaveResult = function()
{
    var projectPath = app.project.file.path.replace(/%20/g, ' ')
    log(result);
    var projectName = app.project.file.name.replace(/%20/g, ' ')
    var f = new File(projectPath + '/' + projectName.slice(0, -4) + '.json');
    f.open('w');
    f.write(JSON.stringify(result));
    f.close();
}

LoadProject();
ProLayer ();
SaveResult();
//log(compItems);