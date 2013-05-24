import re 

from flask import Flask, render_template, redirect

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.route('/')
def landing():
    return render_template('index.html', num_millisecs=0)
    
@app.route('/humans.txt')
def humans():
    return render_template('humans.txt')

@app.route('/<incoming_time>')
def landing_with_time(incoming_time):

    tokenized_times = incoming_time.split(':')

    # if we get any time that contains something other than numbers or
    # a colon, or if we get more than two colons (we want hh:mm:ss at the most)
    if re.search('[^0-9:]+', incoming_time) or len(tokenized_times) > 3:
        return render_template('index.html', num_millisecs=0)
    
    # remove any empty times from the list
    times = filter(None, tokenized_times)

    num_secs = 0

    if len(times) == 1:
        num_secs = num_secs + int(times[0])
    elif len(times) == 2:
        num_secs = num_secs + int(times[0]) * 60 + int(times[1])
    elif len(times) == 3:
        num_secs = num_secs + int(times[0]) * 3600 + int(times[1]) * 60 + int(times[2])
    
    # convert to milliseconds and return    
    return render_template('index.html', num_millisecs=num_secs * 1000)


if __name__ == '__main__':
    app.run(debug=True)
    
    
