from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def landing():

    return render_template('index.html', num_mili_secs=0)

@app.route('/<incoming_time>')
def landing_with_time(incoming_time):
    print incoming_time
    tokenized_time = incoming_time.split(':')

    times = filter(None, tokenized_time)
    
    num_secs = 0

    if len(times) == 1:
       num_secs = num_secs +  int(times[0])
    elif len(times) == 2:
       num_secs = num_secs + int(times[0]) * 60 + int(times[1])
    elif len(times) == 3:
       num_secs = num_secs + int(times[0]) * 3600 + int(times[1]) * 60 + int(times[2])
    
    print num_secs
    
    # convert to miliseconds
    num_mili_secs = num_secs * 1000
    
    return render_template('index.html', num_mili_secs=num_mili_secs)


if __name__ == '__main__':
    app.run(debug=True)