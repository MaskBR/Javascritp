function paixu(){
    var maxNum = 0;
    let i = [1,4,10,2,5,20];
        for (j=0;j<i.length;j++){
            for (k=0;k<i.length;k++){
                if(i[j]>=i[k]){
                    maxNum = i[j];
                    i[j]=i[k];
                    i[k]=maxNum;
                }
            }
        }   
    console.log(i);
}