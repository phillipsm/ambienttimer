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

    num_secs = 0

    if ':' in incoming_time:
        tokenized_times = incoming_time.split(':')

        # remove any empty times from the list
        times = filter(None, tokenized_times)

        if len(times) == 1:
            num_secs = num_secs + int(times[0])
        elif len(times) == 2:
            num_secs = num_secs + int(times[0]) * 60 + int(times[1])
        elif len(times) == 3:
            num_secs = num_secs + int(times[0]) * 3600 + int(times[1]) * 60 + int(times[2])

    elif re.search('[hms]+', incoming_time):
        # We might have received the newer syntax of --h--m--s
        if num_secs == 0:
            secs = re.search('([0-9]*)s', incoming_time)
            if secs:
                num_secs += num_secs + int(secs.group(1))

            mins = re.search('([0-9]*)m', incoming_time)
            if mins:
                num_secs += num_secs + int(mins.group(1)) * 60

            hours = re.search('([0-9]*)h', incoming_time)
            if hours:
                num_secs += num_secs + int(hours.group(1)) * 3600


    else:
        return render_template('index.html', num_millisecs=0)
    
    # convert to milliseconds and return    
    return render_template('index.html', num_millisecs=num_secs * 1000)


if __name__ == '__main__':
    app.run(debug=True)
    
    
