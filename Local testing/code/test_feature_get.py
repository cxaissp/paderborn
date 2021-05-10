# -*- coding: UTF-8 -*-
# 提取特征，特征说明见feature说明
import csv

import pandas as pd
import numpy as np
import os
from scipy import stats
from scipy import signal
import statsmodels.api as sm
from itertools import chain
from pywt import wavedec
import python_speech_features

columns_name = ['sensor_ave','sensor_std','sensor_var','sensor_skew','sensor_peak','sensor_ptp','sensor_ratio',
                'sensor_ca5e','sensor_cd5e','sensor_cd4e','sensor_cd3e','sensor_cd2e','sensor_cd1e','sensor_ar_1',
                'sensor_ar_2','sensor_ar_3','sensor_ar_4','sensor_ar_5','sensor_ar_6','sensor_ar_7','sensor_ar_8',
                'sensor_ar_9','sensor_ar_10','sensor_ar_11','sensor_ar_12','sensor_ar_13','sensor_ar_14','sensor_ar_15',
                'sensor_ar_16','sensor_ar_17','sensor_ar_18','sensor_ar_19','sensor_ar_20','sensor_ar_21','sensor_ar_22',
                'sensor_ar_23','sensor_ar_24','sensor_ar_25','sensor_ar_26','sensor_ar_27','sensor_ar_28','sensor_ar_29',
                'sensor_ar_30','mfcc_2','mfcc_3','mfcc_4','mfcc_5','mfcc_6','mfcc_7','mfcc_8','mfcc_9','mfcc_10','mfcc_11',
                'mfcc_12','mfcc_13']

column_all = [ x + '_vib' for x in columns_name]
#column_all.append('label')

def base_feaget(n_row):
    df_i = np.asarray(n_row)
    result_list = []
    flist, plist = signal.welch(df_i, 25600)
    main_ener1 = np.square(plist[np.logical_and(flist >= 1600,
                                                flist < 2400)]).sum()
    main_ener2 = np.square(plist[np.logical_and(flist >= 3600,
                                                flist < 3950)]).sum()
    ratio = main_ener1 / main_ener2
    # wave
    cA5, cD5, cD4, cD3, cD2, cD1 = wavedec(df_i, 'db10', level=5)
    ener_cA5 = np.square(cA5).sum()
    ener_cD5 = np.square(cD5).sum()
    ener_cD4 = np.square(cD4).sum()
    ener_cD3 = np.square(cD3).sum()
    ener_cD2 = np.square(cD2).sum()
    ener_cD1 = np.square(cD1).sum()
    # ar
    method1_maxlag = 29
    model_ar = sm.tsa.AR(df_i)
    ar_result = model_ar.fit(method1_maxlag)
    # mfcc
    mfccs = python_speech_features.mfcc(df_i,
                                        samplerate=25600,
                                        winlen=0.5,
                                        winstep=0.1,
                                        nfft=12800)
    # output
    # 一些基本特征
    list_para = [
        df_i.mean(), df_i.std(),
        np.var(df_i),
        stats.skew(df_i),
        stats.kurtosis(df_i), df_i.ptp(), ratio, ener_cA5, ener_cD5,
        ener_cD4, ener_cD3, ener_cD2, ener_cD1
    ]
    list_para.extend(ar_result.params)
    list_para.extend(mfccs[0][1:])
    result_list.extend(list_para)
    return result_list

def write_csv(path, data_row):
    with open(path,'a+',newline='',encoding='utf-8') as f:
        csv_write = csv.writer(f)
        csv_write.writerow(data_row)

def prepare(r_path, w_path):
    #pathname--分帧后sensor文件夹绝对路径 plcfile--对应的plc文件绝对路径 targetfile--目标文件绝对路径
    # r'D:\project\PHM2018\train\01-TrainingData-qLua\01\Sensor'
    #sensor-processing
    # write_csv(w_path, column_all)
    with open(r_path, 'r', encoding='UTF-8') as f:
        reader = csv.reader(f)
        filewr = r_path.split(".")[0]
        whattowr = []
        x = 0
        for row in reader:
            n_row = []
            for i in row:
                n_row.append(float(i))
            result = base_feaget(n_row)
            if x!=0:
                #result.append(row[-1])
                whattowr.append(result)
            x += 1
            print(x)
        wrtocsv = pd.DataFrame(whattowr, columns=column_all)
        #wrtocsv['file_source'] = filewr
        wrtocsv.to_csv(w_path, index_label=False)

if __name__ == '__main__':
    #prepare('../data/traindata_N15_M07_F10.csv', '../feature/feature_M07_m.csv')
    prepare('../test/testdatashuffle_2.csv', '../feature/feature_test2_mm.csv')