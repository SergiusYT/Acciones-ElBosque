package co.edu.unbosque.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BarDTO {

    private String t; // timestamp
    private double o; // open
    private double h; // high
    private double l; // low
    private double c; // close
    private long v;   // volume

    public String getT(){
        return t;
    }
    public void setT(String t){
        this.t = t;
    }
    public double getO(){
        return o;
    }
    public void setO(double o){
        this.o = o;
    }
    public double getH(){
        return h;
    }
    public void setH(double h){
        this.h = h;
    }
    public double getL(){
        return l;
    }
    public void setL(double l){
        this.l = l;
    }
    public double getC(){
        return c;
    }
    public void setC(double c){
        this.c = c;
    }
    public long getV(){
        return v;
    }
    public void setV(long v){
        this.v = v;
    }

}