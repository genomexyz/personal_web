#!/usr/bin/python3

import numpy as np
import random
import pickle
from flask import Flask
from flask_cors import CORS

#setting
qtable = {}
board = np.zeros((3,3))
user = 0

def getQ(state, action): #get Q states
	if(qtable.get((state,action))) is None:
		qtable[(state,action)] = 0.0
	return qtable.get((state,action))

def saveQtable(file_name):  #save table
	with open(file_name, 'wb') as handle:
		pickle.dump(qtable, handle, protocol=pickle.HIGHEST_PROTOCOL)

def loadQtable(file_name): #load table
	with open(file_name, 'rb') as handle:
		qtable = pickle.load(handle)

def possible_moves(position):
	move = []
	
	return np.asarray(move)

#print(getQ('1','2'))
#print(possible_moves(board))

##############
#main program#
##############

app = Flask(__name__)
CORS(app)

@app.route('/ryan/think/<position>')
def process(position):
	global user
	preprocessing = position.split('_')
	user += 1
	return str(user)
