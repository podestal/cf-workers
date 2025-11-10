import { Hono } from 'hono';
import { v4 as uuidv4 } from 'uuid';
import { stream, streamText, streamSSE } from 'hono/streaming'

interface Video {
    id: string;
    videoName: string;
    chanelName: string;
    duration: number;
}

let videos: Video[] = [];

const app = new Hono();

app.get('/', (c) => {
    return c.html('<h1>Welcome to Hono Course</h1>')
})

app.post('/video', async (c) => {
    const {videoName, chanelName, duration} = await c.req.json();
    console.log('videoName', videoName);
    console.log('chanelName', chanelName);
    console.log('duration', duration);
    
    const newVideo = {
        id: uuidv4(),
        videoName,
        chanelName,
        duration,
    }
    videos.push(newVideo);
    return c.json(newVideo)
})

// Read all videos
app.get('/videos', c => {
    return streamText(c, async(stream) => {
        videos.map(async video => {
            await stream.writeln(JSON.stringify(video));
        })
    })
})


export default app;