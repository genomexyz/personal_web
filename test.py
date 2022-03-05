#!/usr/bin/python3

import numpy as np
import random
import pickle

#setting
data = 'qtable.h5'

try:
	bukadata = open(data, 'rb')
	qtab = pickle.load(bukadata)
except IOError:
	qtab = {}

print(qtab)
