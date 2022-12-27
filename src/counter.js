import { InternalConvexClient, ConvexHttpClient } from "convex/browser";
import convexConfig from "../convex/_generated/clientConfig";

let internal_client   = null;
let g_title_str       = null;
let convexhttp        = null;


export function set_g_title_str(tstr) {
    g_title_str = tstr;
}

export function init_and_update_counter(){

    console.log("Connecting HttpClient to :"+convexConfig.address);
    convexhttp= new ConvexHttpClient(convexConfig);

    // Call reactive_update_counter each time the results of getCounter
    // changes
    internal_client   = new InternalConvexClient(convexConfig, updatedQueries => reactive_update_counter(updatedQueries));
    const { queryToken, unsubscribe } = internal_client.subscribe("getCounter",[] );

    const val = convexhttp.mutation("incrementCounter")(1);
    val.then(get_counter_sx, get_counter_fl);
}

function get_counter(){
    const val = convexhttp.query("getCounter")();
    val.then(get_counter_sx, get_counter_fl);
}

function reactive_update_counter (updatedQueries) {
    console.log("Change to counter!");
    const val = convexhttp.query("getCounter")();
    val.then(get_counter_sx, get_counter_fl);
}

function get_counter_sx(ret){
    console.log("got counter sucessfully!"+ret); 
    g_title_str.text = "Hello FlyConv! Total Visitors: "+ret;
}

function get_counter_fl(ret){
    console.log("failed to get counter"); 
}
